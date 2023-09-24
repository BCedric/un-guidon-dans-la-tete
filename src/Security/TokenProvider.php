<?php

// src/Security/Authentication/Provider/WsseProvider.php
namespace App\Security;

use Symfony\Component\Security\Core\User\InMemoryUser;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class TokenProvider implements UserProviderInterface
{

    public function refreshUser(UserInterface $user)
    {
        return $user;
    }

    /**
     * Whether this provider supports the given user class.
     *
     * @return bool
     */
    public function supportsClass(string $class)
    {
        return true;
    }

    /**
     * @return UserInterface
     *
     * @deprecated since Symfony 5.3, use loadUserByIdentifier() instead
     */
    public function loadUserByUsername(string $username): UserInterface
    {
        return new InMemoryUser($username, null);
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        return new InMemoryUser('token_user', null);
    }
}