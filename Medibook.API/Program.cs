using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS for Vite frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Initialize Firebase Admin SDK and FirestoreDb
var credentialFilePath = @"c:\Users\malak\Desktop\CODES\Medibook-vite\Medibook.API\healify-7be5f-firebase-adminsdk-fbsvc-4d6a863b95.json";
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialFilePath);

var projectId = "healify-7be5f";
Environment.SetEnvironmentVariable("FIRESTORE_PROJECT_ID", projectId);

if (FirebaseApp.DefaultInstance == null)
{
    FirebaseApp.Create(new AppOptions
    {
        Credential = GoogleCredential.FromFile(credentialFilePath),
        ProjectId = projectId
    });
}

builder.Services.AddSingleton(provider => FirestoreDb.Create(projectId));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowViteApp");
app.MapControllers();

app.Run();
