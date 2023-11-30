package com.mysite.sbb.todolist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mysite.sbb.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TodoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long todoIndex;

    @Column(nullable = false)
    private String todoTask;

    @JsonIgnore
    @ManyToOne
    private AppUser appUser;
}
