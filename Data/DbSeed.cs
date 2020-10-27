using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data
{
    public static class DbSeed
    {
        public static void Seed(ApplicationContext applicationContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            List<Culture> cultures,
            IConfiguration configuration)
        {
            CultureSeed(applicationContext, cultures);
            ConditionSeed(applicationContext);
            StatusSeed(applicationContext);
            CitySeed(applicationContext);
            RolesFeed(roleManager).Wait();
            UsersSeed(userManager, configuration["Superuser:Mail"], configuration["Superuser:Password"]).Wait();
        }
        private static void CultureSeed(ApplicationContext application, List<Culture> cultures)
        {
            if (!application.Cultures.Any())
            {
                application.AddRange(cultures);
                application.SaveChanges();
            }
        }

        private static void ConditionSeed(ApplicationContext applicationContext)
        {
            if (!applicationContext.Conditions.Any())
            {
                var lostCondition = new Condition
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "lost",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                lostCondition.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "uk-UA",
                        Value = "Втрачено"
                    }
                );
                lostCondition.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Lost",
                    }
                 );
                lostCondition.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Stracono",
                     }
                 );
                lostCondition.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Утрачено",
                     }
                 );

                var lostRecentlyCondition = new Condition
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "lost-recently",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                lostRecentlyCondition.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "uk-UA",
                        Value = "Втрачено нещодавно"
                    }
                );
                lostRecentlyCondition.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Lost recently",
                    }
                 );
                lostRecentlyCondition.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Utracono niedawno",
                     }
                 );
                lostRecentlyCondition.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Недавно утрачено",
                     }
                 );

                var onTheVergeOfLoss = new Condition
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "verge-of-loss",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                onTheVergeOfLoss.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "uk-UA",
                        Value = "На межі втрати"
                    }
                );
                onTheVergeOfLoss.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "On the verge of loss",
                    }
                 );
                onTheVergeOfLoss.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Na skraju straty",
                     }
                 );
                onTheVergeOfLoss.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "На границе утраты",
                     }
                 );

                var needsRepair = new Condition
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "needs-repair",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                needsRepair.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "uk-UA",
                        Value = "Потребує ремонту"
                    }
                );
                needsRepair.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Needs repair",
                    }
                 );
                needsRepair.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Wymaga naprawy",
                     }
                 );
                needsRepair.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Потребует ремонта",
                     }
                 );

                var inGoodCondition = new Condition
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "good-condition",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                inGoodCondition.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "uk-UA",
                        Value = "В гарному стані"
                    }
                );
                inGoodCondition.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "In good condition",
                    }
                 );
                inGoodCondition.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "W dobrym stanie",
                     }
                 );
                inGoodCondition.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "В хорошем состоянии",
                     }
                 );
                applicationContext.Conditions.AddRange(lostCondition, lostRecentlyCondition, onTheVergeOfLoss, needsRepair, inGoodCondition);
                applicationContext.SaveChanges();
            }
        }

        private static void StatusSeed(ApplicationContext applicationContext)
        {
            if (!applicationContext.Statuses.Any())
            {
                var monumentOfLocalSignificance = new Status
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "local",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                monumentOfLocalSignificance.Name.Localizations.Add(
                        new Localization
                        {
                            CultureCode = "uk-UA",
                            Value = "Пам'ятка місцевого значення"
                        }
                    );
                monumentOfLocalSignificance.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Monument of local significance",
                    }
                 );
                monumentOfLocalSignificance.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Zabytek o znaczeniu lokalnym",
                     }
                 );
                monumentOfLocalSignificance.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Достопримечательность местного значения",
                     }
                 );

                var national = new Status
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "national",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                national.Name.Localizations.Add(
                        new Localization
                        {
                            CultureCode = "uk-UA",
                            Value = "Пам'ятка національного значення"
                        }
                    );
                national.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Monument of national significance",
                    }
                 );
                national.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Zabytek o znaczeniu narodowym",
                     }
                 );
                national.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Достопримечательность национального значения",
                     }
                 );

                var worthNoting = new Status
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Abbreviation = "noting",
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
                worthNoting.Name.Localizations.Add(
                        new Localization
                        {
                            CultureCode = "uk-UA",
                            Value = "Не підпадає під жодну категорію"
                        }
                    );
                worthNoting.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Does not fall into any category",
                    }
                 );
                worthNoting.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Nie należy do żadnej kategorii",
                     }
                 );
                worthNoting.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Не подпадает ни под одну категорию",
                     }
                 );

                applicationContext.Statuses.AddRange(monumentOfLocalSignificance, national, worthNoting);
                applicationContext.SaveChanges();
            }
        }

        private static void CitySeed(ApplicationContext applicationContext)
        {
            if (!applicationContext.Cities.Any())
            {
                var poltava = new City
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };

                poltava.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "uk-UA",
                        Value = "Полтава"
                    }
                );
                poltava.Name.Localizations.Add(
                    new Localization
                    {
                        CultureCode = "en-GB",
                        Value = "Poltava",
                    }
                 );
                poltava.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "pl-PL",
                         Value = "Połtawa",
                     }
                 );
                poltava.Name.Localizations.Add(
                     new Localization
                     {
                         CultureCode = "ru-RU",
                         Value = "Полтава",
                     }
                 );
                applicationContext.Cities.AddRange(poltava);
                applicationContext.SaveChanges();
            }
        }

        private static async Task RolesFeed(RoleManager<IdentityRole> roleManager)
        {
            string role_Admin = "Admin";
            string role_Editor = "Editor";
            if (!await roleManager.RoleExistsAsync(role_Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Admin));
            }
            if (!await roleManager.RoleExistsAsync(role_Editor))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Editor));
            }
        }

        private static async Task UsersSeed(UserManager<ApplicationUser> userManager, string mail, string password)
        {
            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Superuser",
                Email = mail,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                DisplayName = "Superuser"
            };

            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, password);
                await userManager.AddToRoleAsync(user_Admin, "Admin");
                await userManager.AddToRoleAsync(user_Admin, "Editor");
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
        }
    }
}