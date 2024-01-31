package clan.midnight.tortolla.repository;


import clan.midnight.tortolla.User;

public interface UserRepository {
    User getById(long id);

    User getByUsername(String username);

    User put(String username, String passwordHash, String fullName);
}
