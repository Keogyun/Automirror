package com.mysite.sbb.todolist;

import com.mysite.sbb.appuser.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {

    private final AppUserRepository appUserRepository;
    private final TodoListRepository todoListRepository;

    public TodoList addTodoList(TodoListDto todoListDto){
        TodoList todoList = new TodoList();
        todoList.setAppUser(appUserRepository.findByUserId(todoListDto.getUserId()));
        todoList.setTodoTask(todoListDto.getTodoTask());
        this.todoListRepository.save(todoList);
        return todoList;
    }

    public ArrayList<TodoList> findTodoList(String userId){
        ArrayList<TodoList> todoList = this.todoListRepository.findByAppUser(appUserRepository.findByUserId(userId));
        return todoList;
    }

    public TodoList findTodoList(String userId, String todoTask){
        TodoList todoList = this.todoListRepository.findByAppUserAndTodoTask(appUserRepository.findByUserId(userId), todoTask);
        return todoList;
    }

    public void deleteTodo(TodoList todoList){
        this.todoListRepository.delete(todoList);
    }
}
