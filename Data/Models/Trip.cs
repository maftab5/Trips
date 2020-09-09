using System;
namespace Trips.Data
{
    public class Trip
    {
  
   public int Id { get;set;}

   public string Name {set;get;}

   public string Description {set;get;}

   public DateTime DateStarted { get; set; }
    public DateTime ? DateCompleted { get; set; } // ? makes the property nullable, that means it can be optional

    }
}