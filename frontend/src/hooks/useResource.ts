import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api';

interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

function useResource<T>(fetcher: () => Promise<T>): ResourceState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
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

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return { data, loading, error, reload };
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

export function useSceneSettings() {
  return useResource(api.scene.get);
}
