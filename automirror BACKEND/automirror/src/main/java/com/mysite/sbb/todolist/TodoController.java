package com.mysite.sbb.todolist;

import com.mysite.sbb.appuser.AppUser;
import com.mysite.sbb.appuser.AppUserService;
import com.mysite.sbb.errorstat.ErrorStatService;
import com.mysite.sbb.requeststat.RequestStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;
    private final AppUserService appUserService;
    private final RequestStatService requestStatService;
    private final ErrorStatService errorStatService;

    @PostMapping("/get")
    public ReturnTodo getTodo(@RequestBody Map<String, String> userIdMap){
        String userId = userIdMap.get("userId");
        ReturnTodo returnTodo;
        ArrayList<TodoList> todoListList = todoService.findTodoList(userId);
        if (todoListList.isEmpty() || todoListList == null){
            returnTodo = new ReturnTodo(490, todoListList);

            //통계추가
            errorStatService.increaseTodoCount(userId);
        }
        else{
            System.out.println(todoListList.get(0).getTodoIndex());
            System.out.println(todoListList.get(0).getTodoTask());
            System.out.println(todoListList.get(0).getAppUser());
            returnTodo = new ReturnTodo(200, todoListList);
            requestStatService.increaseTodoCount(userId);
        }
        return returnTodo;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> createTodo(@RequestBody TodoListDto todoListDto){
        HashMap map = new HashMap<>();

        AppUser appUser = appUserService.getAppUser(todoListDto.getUserId());

        if (appUser == null){
            map.put("status", 490);
        }
        else{
            TodoList todoList = todoService.addTodoList(todoListDto);
            map.put("status", 200);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteTodo(@RequestBody Map<String, String> bodyMap){
        HashMap map = new HashMap<>();
        String userId = bodyMap.get("userId");
        String todoTask = bodyMap.get("todoTask");
        TodoList deleteTodo = todoService.findTodoList(userId, todoTask);

        if (deleteTodo == null){
            map.put("status", 490);
        }
        else{
            todoService.deleteTodo(deleteTodo);
            map.put("status", 200);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
