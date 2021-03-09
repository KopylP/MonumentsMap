﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MonumentsMap.Infrastructure.Persistence;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MonumentsMap.Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20210309191216_Tags3")]
    partial class Tags3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("MonumentTag", b =>
                {
                    b.Property<int>("MonumentsId")
                        .HasColumnType("integer");

                    b.Property<string>("TagsTagName")
                        .HasColumnType("text");

                    b.HasKey("MonumentsId", "TagsTagName");

                    b.HasIndex("TagsTagName");

                    b.ToTable("MonumentTag");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("NameId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("NameId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Condition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Abbreviation")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("DescriptionId")
                        .HasColumnType("integer");

                    b.Property<int>("NameId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("Abbreviation")
                        .IsUnique();

                    b.HasIndex("DescriptionId");

                    b.HasIndex("NameId");

                    b.ToTable("Conditions");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Culture", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Code");

                    b.ToTable("Cultures");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Localization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("CultureCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("LocalizationSetId")
                        .HasColumnType("integer");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CultureCode");

                    b.HasIndex("LocalizationSetId");

                    b.ToTable("Localizations");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.LocalizationSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.HasKey("Id");

                    b.ToTable("LocalizationSets");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Monument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<bool>("Accepted")
                        .HasColumnType("boolean");

                    b.Property<int>("CityId")
                        .HasColumnType("integer");

                    b.Property<int>("ConditionId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("DescriptionId")
                        .HasColumnType("integer");

                    b.Property<string>("DestroyPeriod")
                        .HasColumnType("text");

                    b.Property<int?>("DestroyYear")
                        .HasColumnType("integer");

                    b.Property<bool>("IsEasterEgg")
                        .HasColumnType("boolean");

                    b.Property<double>("Latitude")
                        .HasColumnType("double precision");

                    b.Property<double>("Longitude")
                        .HasColumnType("double precision");

                    b.Property<int>("NameId")
                        .HasColumnType("integer");

                    b.Property<string>("Period")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProtectionNumber")
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int>("StatusId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("ConditionId");

                    b.HasIndex("DescriptionId");

                    b.HasIndex("NameId");

                    b.HasIndex("Slug")
                        .IsUnique();

                    b.HasIndex("StatusId");

                    b.ToTable("Monuments");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.MonumentPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("DescriptionId")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.Property<bool>("MajorPhoto")
                        .HasColumnType("boolean");

                    b.Property<int>("MonumentId")
                        .HasColumnType("integer");

                    b.Property<string>("Period")
                        .HasColumnType("text");

                    b.Property<int>("PhotoId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DescriptionId");

                    b.HasIndex("MonumentId");

                    b.HasIndex("PhotoId");

                    b.ToTable("MonumentPhotos");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Participant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DefaultName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("NameId")
                        .HasColumnType("integer");

                    b.Property<int?>("ParticipantRole")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("DefaultName")
                        .IsUnique();

                    b.HasIndex("NameId");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.ParticipantMonument", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("MonumentId")
                        .HasColumnType("integer");

                    b.Property<int>("ParticipantId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("MonumentId");

                    b.HasIndex("ParticipantId");

                    b.ToTable("ParticipantMonuments");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("ImageScale")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Source", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("MonumentId")
                        .HasColumnType("integer");

                    b.Property<int?>("MonumentPhotoId")
                        .HasColumnType("integer");

                    b.Property<string>("SourceLink")
                        .HasColumnType("text");

                    b.Property<int>("SourceType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(0);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("MonumentId");

                    b.HasIndex("MonumentPhotoId");

                    b.ToTable("Sources");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Abbreviation")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("DescriptionId")
                        .HasColumnType("integer");

                    b.Property<int>("NameId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("Abbreviation")
                        .IsUnique();

                    b.HasIndex("DescriptionId");

                    b.HasIndex("NameId");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Tag", b =>
                {
                    b.Property<string>("TagName")
                        .HasColumnType("text");

                    b.HasKey("TagName");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("MonumentTag", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.Monument", null)
                        .WithMany()
                        .HasForeignKey("MonumentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsTagName")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.City", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Name");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Condition", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId");

                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Description");

                    b.Navigation("Name");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Localization", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.Culture", "Culture")
                        .WithMany()
                        .HasForeignKey("CultureCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "LocalizationSet")
                        .WithMany("Localizations")
                        .HasForeignKey("LocalizationSetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Culture");

                    b.Navigation("LocalizationSet");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Monument", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.City", "City")
                        .WithMany("Monuments")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.Condition", "Condition")
                        .WithMany("Monuments")
                        .HasForeignKey("ConditionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.Status", "Status")
                        .WithMany("Monuments")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");

                    b.Navigation("Condition");

                    b.Navigation("Description");

                    b.Navigation("Name");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.MonumentPhoto", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.Monument", null)
                        .WithMany("MonumentPhotos")
                        .HasForeignKey("MonumentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Description");

                    b.Navigation("Photo");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Participant", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId");

                    b.Navigation("Name");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.ParticipantMonument", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.Monument", "Monument")
                        .WithMany("ParticipantMonuments")
                        .HasForeignKey("MonumentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MonumentsMap.Domain.Models.Participant", "Participant")
                        .WithMany("ParticipantMonuments")
                        .HasForeignKey("ParticipantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Monument");

                    b.Navigation("Participant");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Source", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.Monument", "Monument")
                        .WithMany("Sources")
                        .HasForeignKey("MonumentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MonumentsMap.Domain.Models.MonumentPhoto", "MonumentPhoto")
                        .WithMany("Sources")
                        .HasForeignKey("MonumentPhotoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Monument");

                    b.Navigation("MonumentPhoto");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Status", b =>
                {
                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Description")
                        .WithMany()
                        .HasForeignKey("DescriptionId");

                    b.HasOne("MonumentsMap.Domain.Models.LocalizationSet", "Name")
                        .WithMany()
                        .HasForeignKey("NameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Description");

                    b.Navigation("Name");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.City", b =>
                {
                    b.Navigation("Monuments");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Condition", b =>
                {
                    b.Navigation("Monuments");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.LocalizationSet", b =>
                {
                    b.Navigation("Localizations");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Monument", b =>
                {
                    b.Navigation("MonumentPhotos");

                    b.Navigation("ParticipantMonuments");

                    b.Navigation("Sources");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.MonumentPhoto", b =>
                {
                    b.Navigation("Sources");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Participant", b =>
                {
                    b.Navigation("ParticipantMonuments");
                });

            modelBuilder.Entity("MonumentsMap.Domain.Models.Status", b =>
                {
                    b.Navigation("Monuments");
                });
#pragma warning restore 612, 618
        }
    }
}
