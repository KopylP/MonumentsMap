using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Data.Migrations
{
    public partial class DestroyYear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DestroyPeriod",
                table: "Monuments",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DestroyYear",
                table: "Monuments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DestroyPeriod",
                table: "Monuments");

            migrationBuilder.DropColumn(
                name: "DestroyYear",
                table: "Monuments");
        }
    }
}
