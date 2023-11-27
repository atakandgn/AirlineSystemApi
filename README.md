# Airline API Project

This repository contains the source code for an API project developed for a fictitious airline company. The project provides web services for clients to perform ticketing transactions with the airline company.

## Project Overview

The API project includes the following features:

- **Query Ticket:** Clients can query for available flights based on the date, departure location, destination location, and the number of people.

- **Buy Ticket:** Clients can perform a ticket purchase transaction using the date, departure location, destination location, passenger name, and the number of people.

## Technologies Used

- **Node.js and Express:** The server is built using Node.js and the Express framework.

- **Swagger:** Swagger is integrated to provide API documentation. You can access the Swagger UI at the `/api-docs` endpoint.

- **Sequelize:** Sequelize is used as the ORM (Object-Relational Mapping) tool for interacting with the database.

- **JWT (JSON Web Token):** Authentication is implemented using JWT. Clients need to include a valid JWT token in the request header for authenticated endpoints.

- **Bcrypt:** Passwords are securely hashed using Bcrypt before being stored in the database.

## Development Environment

The project is developed using the Node.js runtime and can be run locally on any machine with Node.js installed. Make sure to set up the required environment variables by creating a `.env` file based on the provided `.env.example`.

## Database

The data model is implemented using Sequelize and assumes the usage of a relational database. Currently, the code is set up to work with a database service from any cloud provider, with a preference for Azure.

## How to Run

1. Install dependencies: `npm install`
2. Set up the database connection and environment variables in a `.env` file.
3. Run the server: `npm start`
4. Access the API at `http://localhost:3000`

## Endpoints

- **GET `/`:** Root endpoint providing a welcome message and information about the API.

- **POST `/login`:** Endpoint for user authentication. Requires a valid username and password.

- **POST `/register`:** Endpoint for user registration. Creates a new user account.

- **POST `/query-ticket`:** Endpoint for querying available flights based on specified criteria.

- **POST `/buy-ticket`:** Endpoint for purchasing tickets. Requires authentication and deducts available seats upon successful transaction.

## Additional Notes

- The project includes a basic front-end element using SCSS for styling. Access the welcome message by visiting the root URL.

- Please refer to the Swagger documentation for detailed information on each endpoint.

## Live Project

The live project is deployed on [RENDER](https://render.com/). You can access it [here](https://airlinesystemapi.onrender.com).

## Database Schema

### Clients

The schema for the "Clients" table includes the following fields:

- **`id`:** Unique identifier for the client.
- **`name`:** The first name of the client.
- **`surname`:** The last name of the client.
- **`username`:** The username associated with the client account (unique).
- **`email`:** The email address associated with the client account (unique).
- **`phone`:** The phone number associated with the client account.
- **`password`:** The hashed password for the client account.

![Clients Table Schema](<insert link to clients table schema image>)

### Flights

The schema for the "Flights" table includes the following fields:

- **`flight_id`:** Unique identifier for each flight.
- **`departure_location`:** The departure location for the flight.
- **`destination_location`:** The destination location for the flight.
- **`date`:** The date of the flight.
- **`price`:** The price of the flight.
- **`seat_capacity`:** The total seat capacity of the flight.

![Flights Table Schema](<insert link to flights table schema image>)

Feel free to explore the code, contribute, and provide feedback. Thank you for checking out this Airline API project!

## Communication
For communication: reach out to atakandogan.info@gmail.com or [LinkedIn](https://www.linkedin.com/in/atakandoan/)

********************************************************************************************************************************************************

# Havayolu API Projesi

Bu depo, hayali bir havayolu şirketi için geliştirilen bir API projesinin kaynak kodunu içermektedir. Proje, müşterilerin havayolu şirketi ile bilet işlemleri gerçekleştirmelerini sağlayan web hizmetleri sunmaktadır.

## Proje Genel Bakış

API projesi aşağıdaki özellikleri içermektedir:

- **Bilet Sorgula:** Müşteriler, tarih, kalkış yeri, varış yeri ve kişi sayısına göre uygun uçuşları sorgulayabilirler.

- **Bilet Satın Al:** Müşteriler, tarih, kalkış yeri, varış yeri, yolcu adı ve kişi sayısını kullanarak bilet satın alma işlemi gerçekleştirebilirler.

## Kullanılan Teknolojiler

- **Node.js ve Express:** Sunucu, Node.js ve Express çerçevesi kullanılarak oluşturulmuştur.

- **Swagger:** Swagger, API belgelerini sağlamak amacıyla entegre edilmiştir. Swagger UI'ye `/api-docs` endpoint'i üzerinden erişebilirsiniz.

- **Sequelize:** Veritabanı ile etkileşim için ORM (Object-Relational Mapping) aracı olarak Sequelize kullanılmıştır.

- **JWT (JSON Web Token):** Kimlik doğrulama, JWT kullanılarak uygulanmıştır. Yetkilendirilmiş endpoint'ler için geçerli bir JWT token'ı istemcilerin isteği başlığında bulunmalıdır.

- **Bcrypt:** Şifreler, veritabanında depolanmadan önce güvenli bir şekilde hashlenmiştir.

## Geliştirme Ortamı

Proje, Node.js çalışma zamanı kullanılarak geliştirilmiştir ve Node.js yüklü olan herhangi bir makinede yerel olarak çalıştırılabilir. Gerekli çevresel değişkenleri oluşturmak için `.env.example` dosyasını temel alarak bir `.env` dosyası oluşturmayı unutmayın.

## Veritabanı

Veri modeli, Sequelize kullanılarak uygulanmış olup ilişkisel bir veritabanının kullanımını varsayar. Şu anda, kod, herhangi bir bulut sağlayıcısından gelen bir veritabanı servisiyle çalışmak üzere yapılandırılmıştır, tercihen Azure.

## Nasıl Çalıştırılır

1. Bağımlılıkları yükleyin: `npm install`
2. Veritabanı bağlantısını ve çevresel değişkenleri `.env` dosyasında yapılandırın.
3. Sunucuyu çalıştırın: `npm start`
4. API'ye `http://localhost:3000` adresinden erişin

## Endpoints

- **GET `/`:** API hakkında bir karşılama mesajı ve bilgi sağlayan ana endpoint.

- **POST `/login`:** Kullanıcı kimlik doğrulama için endpoint. Geçerli bir kullanıcı adı ve şifre gerektirir.

- **POST `/register`:** Kullanıcı kaydı için endpoint. Yeni bir kullanıcı hesabı oluşturur.

- **POST `/query-ticket`:** Belirli kriterlere göre uygun uçuşları sorgulamak için endpoint.

- **POST `/buy-ticket`:** Bilet satın almak için endpoint. Kimlik doğrulama gerektirir ve başarılı işlem sonrasında mevcut koltukları düşer.

## Ek Notlar

- Proje, stil için SCSS kullanarak temel bir ön yüz öğesi içermektedir. Ana URL'yi ziyaret ederek karşılama mesajına erişebilirsiniz.

- Lütfen her endpoint hakkında detaylı bilgi için Swagger belgelerine başvurun.

## Canlı Proje

Canlı proje [RENDER](https://render.com/) üzerinde dağıtılmıştır. [Buradan](https://airlinesystemapi.onrender.com) erişebilirsiniz.

## Veritabanı Şeması

### Clients

"Clients" tablosunun şeması aşağıdaki alanları içermektedir:

- **`id`:** Müşteri için benzersiz tanımlayıcı.
- **`name`:** Müşterinin adı.
- **`surname`:** Müşterinin soyadı.
- **`username`:** Müşteri hesabı ile ilişkilendirilmiş kullanıcı adı (benzersiz).
- **`email`:** Müşteri hesabı ile ilişkilendirilmiş e-posta adresi (benzersiz).
- **`phone`:** Müşteri hesabı ile ilişkilendirilmiş telefon numarası.
- **`password`:** Müşteri hesabı için hashlenmiş şifre.

![Clients Tablo Şeması](<insert link to clients table schema image>)

### Flights

"Flights" tablosunun şeması aşağıdaki alanları içermektedir:

- **`flight_id`:** Her uçuş için benzersiz tanımlayıcı.
- **`departure_location`:** Uçuşun kalkış yeri.
- **`destination_location`:** Uçuşun varış yeri.
- **`date`:** Uçuşun tarihi.
- **`price`:** Uçuşun fiyatı.
- **`seat_capacity`:** Uçuşun toplam koltuk kapasitesi.

![Flights Tablo Şeması](<insert link to flights table schema image>)

Kodu keşfetmek, katkıda bulunmak ve geri bildirimde bulunmak için özgürsünüz. Bu Havayolu API projesini incelediğiniz için teşekkür ederiz!

## İletişim
İletişim için: atakandogan.info@gmail.com veya [LinkedIn](https://www.linkedin.com/in/atakandoan/)
