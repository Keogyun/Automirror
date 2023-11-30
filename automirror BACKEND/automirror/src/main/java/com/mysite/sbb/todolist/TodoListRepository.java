package com.mysite.sbb.todolist;

import com.mysite.sbb.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface TodoListRepository extends JpaRepository<TodoList, Long> {
    ArrayList<TodoList> findByAppUser(AppUser appUser);

    TodoList findByAppUserAndTodoTask(AppUser appUser, String todoTask);
}
