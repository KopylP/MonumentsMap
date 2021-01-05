using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    public partial class StatusConditionParticipantAbbreviationUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Abbreviation",
                table: "Statuses",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "DefaultName",
                table: "Participants",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Abbreviation",
                table: "Conditions",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Statuses_Abbreviation",
                table: "Statuses",
                column: "Abbreviation",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Participants_DefaultName",
                table: "Participants",
                column: "DefaultName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_Abbreviation",
                table: "Conditions",
                column: "Abbreviation",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Statuses_Abbreviation",
                table: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Participants_DefaultName",
                table: "Participants");

            migrationBuilder.DropIndex(
                name: "IX_Conditions_Abbreviation",
                table: "Conditions");

            migrationBuilder.AlterColumn<string>(
                name: "Abbreviation",
                table: "Statuses",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "DefaultName",
                table: "Participants",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "Abbreviation",
                table: "Conditions",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");
        }
    }
}
