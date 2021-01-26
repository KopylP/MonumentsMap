using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    public partial class RemoveUserAndAuthTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_AspNetUsers_UserId",
                table: "Cities");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "Tokens");

            migrationBuilder.DropIndex(
                name: "IX_Cities_UserId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Cities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Cities",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: true),
                    ExpireAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Salt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tokens", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cities_UserId",
                table: "Cities",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_AspNetUsers_UserId",
                table: "Cities",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
