using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class AppointmentSlot
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string DoctorId { get; set; } = string.Empty;

        [FirestoreProperty]
        public string DoctorName { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Date { get; set; } = string.Empty; // Format: YYYY-MM-DD

        [FirestoreProperty]
        public string StartTime { get; set; } = string.Empty; // Format: HH:mm

        [FirestoreProperty]
        public string EndTime { get; set; } = string.Empty; // Format: HH:mm

        [FirestoreProperty]
        public int TotalSlots { get; set; }

        [FirestoreProperty]
        public int AvailableSlots { get; set; }

        [FirestoreProperty]
        public double ConsultationFees { get; set; }

        [FirestoreProperty]
        public string CreatedAt { get; set; } = System.DateTime.UtcNow.ToString("o");
    }
}
