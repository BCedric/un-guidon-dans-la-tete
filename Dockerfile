FROM php:8.1-apache

WORKDIR  /var/www/html/

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN apt-get update \
    && apt-get install -y --no-install-recommends locales apt-utils git libicu-dev g++ libpng-dev libxml2-dev libzip-dev libonig-dev libxslt-dev libldap2-dev vim;

RUN echo "en_US.UTF8 UTF8" >> /etc/locale.gen && \
    echo "fr_FR.UTF8 UTF8" >> /etc/locale.gen && \
    locale-gen

RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls aa && \
    mv composer.phar /usr/local/bin/composer

RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo pdo_mysql gd opcache intl zip calendar dom mbstring zip gd xsl
RUN docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ \
    && docker-php-ext-install ldap
RUN pecl install apcu && docker-php-ext-enable apcu

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

RUN apt-get update
RUN chmod 777 /var/www

COPY vhosts.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

CMD ["apache2-foreground"]
