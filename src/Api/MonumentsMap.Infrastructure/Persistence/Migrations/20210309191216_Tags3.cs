using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    public partial class Tags3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonumentTags_Monuments_MonumentsId",
                table: "MonumentTags");

            migrationBuilder.DropForeignKey(
                name: "FK_MonumentTags_Tags_TagsTagName",
                table: "MonumentTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MonumentTags",
                table: "MonumentTags");

            migrationBuilder.RenameTable(
                name: "MonumentTags",
                newName: "MonumentTag");

            migrationBuilder.RenameIndex(
                name: "IX_MonumentTags_TagsTagName",
                table: "MonumentTag",
                newName: "IX_MonumentTag_TagsTagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MonumentTag",
                table: "MonumentTag",
                columns: new[] { "MonumentsId", "TagsTagName" });

            migrationBuilder.AddForeignKey(
                name: "FK_MonumentTag_Monuments_MonumentsId",
                table: "MonumentTag",
                column: "MonumentsId",
                principalTable: "Monuments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MonumentTag_Tags_TagsTagName",
                table: "MonumentTag",
                column: "TagsTagName",
                principalTable: "Tags",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonumentTag_Monuments_MonumentsId",
                table: "MonumentTag");

            migrationBuilder.DropForeignKey(
                name: "FK_MonumentTag_Tags_TagsTagName",
                table: "MonumentTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MonumentTag",
                table: "MonumentTag");

            migrationBuilder.RenameTable(
                name: "MonumentTag",
                newName: "MonumentTags");

            migrationBuilder.RenameIndex(
                name: "IX_MonumentTag_TagsTagName",
                table: "MonumentTags",
                newName: "IX_MonumentTags_TagsTagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MonumentTags",
                table: "MonumentTags",
                columns: new[] { "MonumentsId", "TagsTagName" });

            migrationBuilder.AddForeignKey(
                name: "FK_MonumentTags_Monuments_MonumentsId",
                table: "MonumentTags",
                column: "MonumentsId",
                principalTable: "Monuments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MonumentTags_Tags_TagsTagName",
                table: "MonumentTags",
                column: "TagsTagName",
                principalTable: "Tags",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
