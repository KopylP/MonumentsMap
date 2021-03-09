using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    public partial class Tags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    TagName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.TagName);
                });

            migrationBuilder.CreateTable(
                name: "MonumentTag",
                columns: table => new
                {
                    MonumentsId = table.Column<int>(type: "integer", nullable: false),
                    TagsTagName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonumentTag", x => new { x.MonumentsId, x.TagsTagName });
                    table.ForeignKey(
                        name: "FK_MonumentTag_Monuments_MonumentsId",
                        column: x => x.MonumentsId,
                        principalTable: "Monuments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MonumentTag_Tags_TagsTagName",
                        column: x => x.TagsTagName,
                        principalTable: "Tags",
                        principalColumn: "TagName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MonumentTag_TagsTagName",
                table: "MonumentTag",
                column: "TagsTagName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MonumentTag");

            migrationBuilder.DropTable(
                name: "Tags");
        }
    }
}
