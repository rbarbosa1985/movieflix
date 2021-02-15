package com.devsuperior.movieflix.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.entities.dto.UserUpdateDTO;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.resources.exceptions.FieldMessage;

public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {
	
	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private UserRepository repository;
	
	@Override
	public void initialize(UserUpdateValid ann) {
		
	}
	
	@Override
	public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
		
		//Pegando o ID passado na URL
		@SuppressWarnings("unchecked")
		var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		long userId = Long.parseLong(uriVars.get("id"));
		
		//Lista de Erros
		List<FieldMessage> list = new ArrayList<>();
		
		//Coloque aqui seus testes de Validação, acrescentando objetos FieldMessage à lista.
		User user = repository.findByEmail(dto.getEmail());
		
		if (user != null && user.getId() != userId) {
			list.add(new FieldMessage("Email", "Email já cadastrado!"));
		}
		
		//Aonde é passado o erro para a classe do Beans Validation
		for (FieldMessage e: list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage())
				.addPropertyNode(e.getFieldName()).addConstraintViolation();
		}
		
		return list.isEmpty();
	}

}

