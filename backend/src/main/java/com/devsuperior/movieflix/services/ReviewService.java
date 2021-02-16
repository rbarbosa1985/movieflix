package com.devsuperior.movieflix.services;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.entities.dto.ReviewDTO;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private AuthService authService;
	
	@PreAuthorize("hasAnyRole('MEMBER')")
	@Transactional
	public ReviewDTO insert(@Valid ReviewDTO dto) {
		
		User user = authService.authenticated();		
		authService.validateSelfOrAdmin(user.getId());

		Review entity = new Review();
		entity.setText(dto.getText());
		entity.setMovie(movieRepository.getOne(dto.getMovieId()));
		entity.setUser(user);
		repository.save(entity);		
		return new ReviewDTO(entity);
	}
	
}
