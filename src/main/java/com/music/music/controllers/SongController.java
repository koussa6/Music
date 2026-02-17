package com.music.music.controllers;


import com.music.music.documents.Song;
import com.music.music.dto.SongListResponse;
import com.music.music.dto.SongRequest;
import com.music.music.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService service;

    @PostMapping
    public ResponseEntity<?> addSongs(@RequestPart("request")String request,
                                      @RequestPart("audio")MultipartFile audioFile,
                                      @RequestPart("image")MultipartFile image){
        try{
            ObjectMapper objectMapper=new ObjectMapper();
            SongRequest songRequest=objectMapper.readValue(request, SongRequest.class);
            songRequest.setAudioFile(audioFile);
            songRequest.setImageFile(image);
            Song saved=service.addSong(songRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?>getAllSons(){
        try{
            return ResponseEntity.ok(service.getAllSongs());
        } catch (Exception e) {
            return ResponseEntity.ok(new SongListResponse(false,null));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?>removeSong(@PathVariable String id){
        try{
            boolean removed=service.removeSongs(id);
            if(removed){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }else{
                return ResponseEntity.badRequest().body("Song not found");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
