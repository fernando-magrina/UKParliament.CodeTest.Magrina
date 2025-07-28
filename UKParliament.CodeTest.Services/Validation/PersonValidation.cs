using System.Text.RegularExpressions;

using UKParliament.CodeTest.Data;

namespace UKParliament.CodeTest.Services.Validation
{
    internal static class PersonValidation
    {
        public static void ValidatePerson(Person person)
        {
            if (string.IsNullOrWhiteSpace(person.FirstName) || !Regex.IsMatch(person.FirstName, @"^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$"))
                throw new ArgumentException("First name is required and may only contain letters, spaces, apostrophes, or hyphens.");

            if (string.IsNullOrWhiteSpace(person.LastName) || !Regex.IsMatch(person.LastName, @"^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$"))
                throw new ArgumentException("Last name is required and may only contain letters, spaces, apostrophes, or hyphens.");

            if (string.IsNullOrWhiteSpace(person.Email) || !Regex.IsMatch(person.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                throw new ArgumentException("A valid email is required.");

            if (person.DOB == default || person.DOB > DateOnly.FromDateTime(DateTime.Today))
                throw new ArgumentException("Date of birth must be a valid past date.");

            if (person.Department == null || string.IsNullOrWhiteSpace(person.Department.Name))
                throw new ArgumentException("Department is required.");
        }
    }
}
