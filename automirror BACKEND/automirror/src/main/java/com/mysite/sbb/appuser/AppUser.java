package com.mysite.sbb.appuser;

import com.mysite.sbb.Weather.Weather;
import com.mysite.sbb.bus.Bus;
import com.mysite.sbb.connection.Connection;
import com.mysite.sbb.errorstat.ErrorStat;
import com.mysite.sbb.requeststat.RequestStat;
import com.mysite.sbb.todolist.TodoList;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userIndex;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String userPassword;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String weatherGesture;

    private String todoGesture;

    private String busGesture;

    private String newsGesture;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.REMOVE)
    private Weather weather;

    @OneToMany(mappedBy = "appUser", cascade = CascadeType.REMOVE)
    private List<TodoList> todoList;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.REMOVE)
    private Bus bus;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.REMOVE)
    private RequestStat requestStat;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.REMOVE)
    private ErrorStat errorStat;

    @OneToOne(mappedBy = "appUser", cascade = CascadeType.REMOVE)
    private Connection connection;
}
