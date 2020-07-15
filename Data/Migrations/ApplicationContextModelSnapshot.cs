﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MonumentsMap.Data;

namespace MonumentsMap.Data.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5");

            modelBuilder.Entity("MonumentsMap.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("NameId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("NameId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("MonumentsMap.Models.Condition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Abbreviation")
                        .HasColumnType("TEXT");

                    b.Property<int?>("DescriptionId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NameId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DescriptionId");

                    b.HasIndex("NameId");

                    b.ToTable("Conditions");
                });

            modelBuilder.Entity("MonumentsMap.Models.Culture", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Code");

                    b.ToTable("Cultures");
                });

            modelBuilder.Entity("MonumentsMap.Models.Localization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CultureCode")
                        .HasColumnType("TEXT");

                    b.Property<int>("LocalizationSetId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CultureCode");

                    b.HasIndex("LocalizationSetId");

                    b.ToTable("Localizations");
                });

            modelBuilder.Entity("MonumentsMap.Models.LocalizationSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("LocalizationSets");
                });

            modelBuilder.Entity("MonumentsMap.Models.Monument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Accepted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CityId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ConditionId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("DescriptionId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<double>("Longitude")
                        .HasColumnType("REAL");

                    b.Property<int>("NameId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Period")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StatusId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Year")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("ConditionId");

                    b.HasIndex("DescriptionId");

                    b.HasIndex("NameId");

                    b.HasIndex("StatusId");

                    b.ToTable("Monuments");
                });

            modelBuilder.Entity("MonumentsMap.Models.MonumentPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DescriptionId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MonumentId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Period")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PhotoId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Year")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DescriptionId");

                    b.HasIndex("PhotoId");

                    b.ToTable("MonumentPhotos");
                });

            modelBuilder.Entity("MonumentsMap.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FileName")
                        .HasColumnType("TEXT");

                    b.Property<string>("FilePath")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("MonumentsMap.Models.Source", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("MonumentId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("MonumentPhotoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SourceLink")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("MonumentId");

                    b.HasIndex("MonumentPhotoId");

                    b.ToTable("Sources");
                });

            modelBuilder.Entity("MonumentsMap.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Abbreviation")
                        .HasColumnType("TEXT");

                    b.Property<int?>("DescriptionId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NameId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DescriptionId");

                    b.HasIndex("NameId");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("MonumentsMap.Models.City", b =>
                {
                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MonumentsMap.Models.Condition", b =>
                {
                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId");

                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MonumentsMap.Models.Localization", b =>
                {
                    b.HasOne("MonumentsMap.Models.Culture", "Culture")
                        .WithMany()
                        .HasForeignKey("CultureCode");

                    b.HasOne("MonumentsMap.Models.LocalizationSet", "LocalizationSet")
                        .WithMany("Localizations")
                        .HasForeignKey("LocalizationSetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MonumentsMap.Models.Monument", b =>
                {
                    b.HasOne("MonumentsMap.Models.City", "City")
                        .WithMany("Monuments")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Models.Condition", "Condition")
                        .WithMany("Monuments")
                        .HasForeignKey("ConditionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Models.Status", "Status")
                        .WithMany("Monuments")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MonumentsMap.Models.MonumentPhoto", b =>
                {
                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId");

                    b.HasOne("MonumentsMap.Models.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MonumentsMap.Models.Source", b =>
                {
                    b.HasOne("MonumentsMap.Models.Monument", "Monument")
                        .WithMany("Sources")
                        .HasForeignKey("MonumentId");

                    b.HasOne("MonumentsMap.Models.MonumentPhoto", "MonumentPhoto")
                        .WithMany("Sources")
                        .HasForeignKey("MonumentPhotoId");
                });

            modelBuilder.Entity("MonumentsMap.Models.Status", b =>
                {
                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId");

                    b.HasOne("MonumentsMap.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
