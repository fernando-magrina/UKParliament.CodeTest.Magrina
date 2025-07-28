using Microsoft.EntityFrameworkCore;

namespace UKParliament.CodeTest.Data;

public class PersonManagerContext : DbContext
{
    public PersonManagerContext(DbContextOptions<PersonManagerContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Department>().HasData(
            new Department { Id = 1, Name = "Sales" },
            new Department { Id = 2, Name = "Marketing" },
            new Department { Id = 3, Name = "Finance" },
            new Department { Id = 4, Name = "HR" });

        modelBuilder.Entity<Person>().HasData(
            new { Id = 1, FirstName = "Fernando", LastName = "Magrina Ferreira", DepartmentId = 2, DOB = new DateOnly(1976, 12, 17), Email = "fernandomagrina@gmail.com" },
            new { Id = 2, FirstName = "Liam", LastName = "Cartwright", DepartmentId = 1, DOB = new DateOnly(1978, 05, 31), Email = "LiamCartwright@gmail.com" },
            new { Id = 3, FirstName = "Sophie", LastName = "Delaney", DepartmentId = 4, DOB = new DateOnly(1949, 03, 13), Email = "SophieDelaney@gmail.com" },
            new { Id = 4, FirstName = "Marcus", LastName = "Whitfield", DepartmentId = 3, DOB = new DateOnly(1975, 10, 05), Email = "MarcusWhitfield@gmail.com" });
    }

    public DbSet<Person> People { get; set; }

    public DbSet<Department> Departments { get; set; }
}