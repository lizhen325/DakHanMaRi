﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.UI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public DateTime? JoinAt { get; set; }
        public decimal? SalaryPerHour { get; set; }
        public decimal? TotalHourPerWeek { get; set; }
        public DateTime? LeaveAt { get; set; }
        public int? DelFlag { get; set; }
        public decimal? DailyWorkHours { get; set; }
        public decimal? WeeklySalary { get; set; }
        public string WorkingDays { get; set; }
    }
}