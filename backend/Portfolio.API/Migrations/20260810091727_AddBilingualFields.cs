using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBilingualFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "Skills",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Skills",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "Projects",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "Projects",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BioEn",
                table: "Profiles",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "Profiles",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "Experiences",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoleEn",
                table: "Experiences",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "Achievements",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEn",
                table: "Achievements",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "BioEn",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "RoleEn",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "Achievements");

            migrationBuilder.DropColumn(
                name: "TitleEn",
                table: "Achievements");
        }
    }
}
