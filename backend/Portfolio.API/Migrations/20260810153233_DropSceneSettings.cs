using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Migrations
{
    /// <inheritdoc />
    public partial class DropSceneSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SceneSettings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SceneSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    AmbientColor = table.Column<string>(type: "TEXT", nullable: false),
                    CameraPosition = table.Column<string>(type: "TEXT", nullable: false),
                    CharacterModelUrl = table.Column<string>(type: "TEXT", nullable: true),
                    ParticleColor = table.Column<string>(type: "TEXT", nullable: false),
                    PlatformColor = table.Column<string>(type: "TEXT", nullable: false),
                    PlatformModelUrl = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SceneSettings", x => x.Id);
                });
        }
    }
}
