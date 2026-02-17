package com.music.music.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.music.music.documents.Album;
import com.music.music.dto.AlbumListResponse;
import com.music.music.dto.AlbumRequest;
import com.music.music.exceptions.AlbumNotFoundException;
import com.music.music.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final Cloudinary cloudinary;

    public Album addAlbum(AlbumRequest albumRequest) throws IOException {
        Map<String, Object> imageUploadResult = cloudinary.uploader().upload(albumRequest.getImageFile().getBytes(), ObjectUtils.asMap("resource_type", "image"));
        Album newAlbum = Album.builder()
                .name(albumRequest.getName())
                .bgColor(albumRequest.getBgColor())
                .desc(albumRequest.getDesc())
                .imageUrl(imageUploadResult.get("secure_url").toString())
                .build();
        return albumRepository.save(newAlbum);
    }

    public AlbumListResponse getAllAlbums() {
        return new AlbumListResponse(true, albumRepository.findAll());
    }

    public boolean removeAlbum(String id) {
        Album existingAlbum = albumRepository.findById(id).orElseThrow(() -> new AlbumNotFoundException("Album not found"));
        albumRepository.delete(existingAlbum);
        return true;
    }
}