using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    public partial class MonumentSlugUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Monuments",
                type: "varchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_Slug",
                table: "Monuments",
                column: "Slug",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Monuments_Slug",
                table: "Monuments");

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Monuments",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)");
        }
    }
}
