package com.music.music.controllers;

import com.music.music.dto.AlbumListResponse;
import tools.jackson.databind.ObjectMapper;
import com.music.music.documents.Album;
import com.music.music.dto.AlbumRequest;
import com.music.music.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @PostMapping
    public ResponseEntity<?> addAlbum(@RequestPart("request")String request,
                                      @RequestPart("file")MultipartFile file){
        try{
            ObjectMapper objectMapper=new ObjectMapper();
            AlbumRequest albumRequest=objectMapper.readValue(request, AlbumRequest.class);
            albumRequest.setImageFile(file);
            Album saved=albumService.addAlbum(albumRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?>listALbums() {
        try {
            return ResponseEntity.ok(albumService.getAllAlbums());
        } catch (Exception e) {
            return ResponseEntity.ok(new AlbumListResponse(false,null));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>removeAlbum(@PathVariable String id){
        try{
            boolean removed=albumService.removeAlbum(id);
            if(removed){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }else{
                return ResponseEntity.badRequest().build();
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
