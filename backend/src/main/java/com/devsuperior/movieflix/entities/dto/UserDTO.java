package com.devsuperior.movieflix.entities.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.devsuperior.movieflix.entities.User;


public class UserDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String email;
	
	private Set<RoleDTO> roles = new HashSet<>();

	public UserDTO() {
		
	}

	public UserDTO(Long id, String name, String email, String password, Set<RoleDTO> roles) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
	
	/*Como foi feito o Fetch no relacionamento o usuário 
	 * já traz os campos da tabela do relacionamento e assim
	 * consigo injetar ela direto sem precisar receber o Role
	 */
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();		
		entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<RoleDTO> getRoles() {
		return roles;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserDTO other = (UserDTO) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
