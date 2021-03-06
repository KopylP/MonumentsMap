using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    public partial class EasterEgg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEasterEgg",
                table: "Monuments",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEasterEgg",
                table: "Monuments");
        }
    }
}
