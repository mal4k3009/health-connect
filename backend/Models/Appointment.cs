using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class Appointment
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string PatientId { get; set; } = string.Empty;

        [FirestoreProperty]
        public string PatientName { get; set; } = string.Empty;

        [FirestoreProperty]
        public string DoctorId { get; set; } = string.Empty;

        [FirestoreProperty]
        public string DoctorName { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Specialty { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Date { get; set; } = string.Empty;

        [FirestoreProperty]
        public string TimeSlot { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Status { get; set; } = "Pending"; // Pending | Confirmed | Cancelled

        [FirestoreProperty]
        public double Fees { get; set; }

        [FirestoreProperty]
        public string Notes { get; set; } = string.Empty;

        [FirestoreProperty]
        public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
    }
}
