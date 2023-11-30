package com.mysite.sbb.todolist;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
@AllArgsConstructor
public class ReturnTodo {
    private int status;
    private ArrayList<TodoList> todos;
}
