using Microsoft.EntityFrameworkCore.Migrations;

namespace MonumentsMap.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cultures",
                columns: table => new
                {
                    Code = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cultures", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "LocalizationSets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocalizationSets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NameId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cities_LocalizationSets_NameId",
                        column: x => x.NameId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Conditions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NameId = table.Column<int>(nullable: false),
                    DescriptionId = table.Column<int>(nullable: true),
                    Abbreviation = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conditions_LocalizationSets_DescriptionId",
                        column: x => x.DescriptionId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Conditions_LocalizationSets_NameId",
                        column: x => x.NameId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Localizations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LocalizationSetId = table.Column<int>(nullable: false),
                    CultureCode = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Localizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Localizations_Cultures_CultureCode",
                        column: x => x.CultureCode,
                        principalTable: "Cultures",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Localizations_LocalizationSets_LocalizationSetId",
                        column: x => x.LocalizationSetId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MonumentPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Year = table.Column<int>(nullable: true),
                    Period = table.Column<int>(nullable: true),
                    FileName = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    MonumentId = table.Column<int>(nullable: false),
                    DescriptionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonumentPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MonumentPhotos_LocalizationSets_DescriptionId",
                        column: x => x.DescriptionId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NameId = table.Column<int>(nullable: false),
                    DescriptionId = table.Column<int>(nullable: true),
                    Abbreviation = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Statuses_LocalizationSets_DescriptionId",
                        column: x => x.DescriptionId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Statuses_LocalizationSets_NameId",
                        column: x => x.NameId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Monuments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Year = table.Column<int>(nullable: false),
                    Period = table.Column<int>(nullable: false),
                    NameId = table.Column<int>(nullable: false),
                    DescriptionId = table.Column<int>(nullable: false),
                    CityId = table.Column<int>(nullable: false),
                    StatusId = table.Column<int>(nullable: false),
                    ConditionId = table.Column<int>(nullable: false),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Monuments_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Monuments_Conditions_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "Conditions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Monuments_LocalizationSets_DescriptionId",
                        column: x => x.DescriptionId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Monuments_LocalizationSets_NameId",
                        column: x => x.NameId,
                        principalTable: "LocalizationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Monuments_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cities_NameId",
                table: "Cities",
                column: "NameId");

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_DescriptionId",
                table: "Conditions",
                column: "DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_NameId",
                table: "Conditions",
                column: "NameId");

            migrationBuilder.CreateIndex(
                name: "IX_Localizations_CultureCode",
                table: "Localizations",
                column: "CultureCode");

            migrationBuilder.CreateIndex(
                name: "IX_Localizations_LocalizationSetId",
                table: "Localizations",
                column: "LocalizationSetId");

            migrationBuilder.CreateIndex(
                name: "IX_MonumentPhotos_DescriptionId",
                table: "MonumentPhotos",
                column: "DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_CityId",
                table: "Monuments",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_ConditionId",
                table: "Monuments",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_DescriptionId",
                table: "Monuments",
                column: "DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_NameId",
                table: "Monuments",
                column: "NameId");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_StatusId",
                table: "Monuments",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Statuses_DescriptionId",
                table: "Statuses",
                column: "DescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Statuses_NameId",
                table: "Statuses",
                column: "NameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Localizations");

            migrationBuilder.DropTable(
                name: "MonumentPhotos");

            migrationBuilder.DropTable(
                name: "Monuments");

            migrationBuilder.DropTable(
                name: "Cultures");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Conditions");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "LocalizationSets");
        }
    }
}
