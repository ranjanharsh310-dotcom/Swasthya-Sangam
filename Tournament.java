package com.swasthyasangam.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tournaments")
public class Tournament {

    @Id
    private String id;

    private String title;
    private String category;
    private String organizer;
    private Integer participantsCount;
    private LocalDate endDate;
    private String prize;
    private String description;

    public Tournament() {}

    public Tournament(String id, String title, String category, String organizer, Integer participantsCount, LocalDate endDate, String prize, String description) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.organizer = organizer;
        this.participantsCount = participantsCount;
        this.endDate = endDate;
        this.prize = prize;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public Integer getParticipantsCount() { return participantsCount; }
    public void setParticipantsCount(Integer participantsCount) { this.participantsCount = participantsCount; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getPrize() { return prize; }
    public void setPrize(String prize) { this.prize = prize; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
