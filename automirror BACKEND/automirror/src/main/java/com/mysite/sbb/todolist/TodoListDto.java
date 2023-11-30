package com.mysite.sbb.todolist;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TodoListDto {
    private String todoTask;
    private String userId;
}
