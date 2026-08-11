import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';

interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

const cache = new Map<() => Promise<unknown>, unknown>();
const inflight = new Map<() => Promise<unknown>, Promise<unknown>>();

function load<T>(fetcher: () => Promise<T>): Promise<T> {
  if (inflight.has(fetcher)) return inflight.get(fetcher) as Promise<T>;
  const p = fetcher()
    .then((res) => {
      cache.set(fetcher, res);
      return res;
    })
    .finally(() => inflight.delete(fetcher));
  inflight.set(fetcher, p);
  return p;
}

function useResource<T>(fetcher: () => Promise<T>): ResourceState<T> {
  const [data, setData] = useState<T | null>(() => (cache.has(fetcher) ? (cache.get(fetcher) as T) : null));
  const [loading, setLoading] = useState(() => !cache.has(fetcher));
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    if (cache.has(fetcher)) {
      setData(cache.get(fetcher) as T);
      setLoading(false);
      return;
    }
    setLoading(true);
    load(fetcher)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load data');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, tick]);

  const reload = useCallback(() => {
    cache.delete(fetcher);
    setTick((t) => t + 1);
  }, [fetcher]);

  return { data, loading, error, reload };
}

export function prefetchAll() {
  const fetchers: Array<() => Promise<unknown>> = [api.profile.get, api.socials.list, api.experiences.list, api.projects.list, api.skills.list, api.achievements.list];
  fetchers.forEach((f) => load(f).catch(() => {}));
}

export function useProfile() {
  return useResource(api.profile.get);
}

export function useSocials() {
  return useResource(api.socials.list);
}

export function useExperiences() {
  return useResource(api.experiences.list);
}

export function useProjects() {
  return useResource(api.projects.list);
}

export function useSkills() {
  return useResource(api.skills.list);
}

export function useAchievements() {
  return useResource(api.achievements.list);
}
