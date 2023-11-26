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

Feel free to explore the code, contribute, and provide feedback. Thank you for checking out this Airline API project!

## Communication
For communication: reach out to atakandogan.info@gmail.com or [LinkedIn](https://www.linkedin.com/in/atakandoan/) 

********************************************************************************************************************************************************

# Havayolu API Projesi

Bu depo, hayali bir havayolu şirketi için geliştirilen bir API projesinin kaynak kodlarını içerir. Proje, müşterilerin havayolu şirketi ile bilet işlemleri gerçekleştirmelerini sağlayan web hizmetlerini sunar.

## Proje Genel Bakış

API projesi aşağıdaki özellikleri içerir:

- **Bilet Sorgula:** Müşteriler, tarih, kalkış yeri, varış yeri ve kişi sayısına göre uygun uçuşları sorgulayabilirler.

- **Bilet Satın Al:** Müşteriler, tarih, kalkış yeri, varış yeri, yolcu adı ve kişi sayısı kullanarak bilet satın alma işlemi gerçekleştirebilirler.

## Kullanılan Teknolojiler

- **Node.js ve Express:** Sunucu, Node.js ve Express çerçevesi kullanılarak oluşturulmuştur.

- **Swagger:** Swagger, API belgelerini sağlamak için entegre edilmiştir. Swagger UI'ye `/api-docs` yolundan erişebilirsiniz.

- **Sequelize:** Sequelize, veritabanı ile etkileşim için kullanılan ORM (Object-Relational Mapping) aracıdır.

- **JWT (JSON Web Token):** Kimlik doğrulama, JWT kullanılarak uygulanmıştır. Müşterilerin yetkili uç noktalarda geçerli bir JWT tokenını istek başlığında bulundurmaları gerekmektedir.

- **Bcrypt:** Şifreler, veritabanına saklanmadan önce güvenli bir şekilde Bcrypt kullanılarak karmaşalandırılır.

## Geliştirme Ortamı

Proje, Node.js çalışma zamanı kullanılarak geliştirilmiştir ve Node.js yüklü olan herhangi bir makinede yerel olarak çalıştırılabilir. Gerekli çevresel değişkenleri, sağlanan `.env.example` dosyasına dayalı olarak bir `.env` dosyası oluşturarak ayarlamayı unutmayın.

## Veritabanı

Veri modeli Sequelize kullanılarak uygulanmış olup, ilişkisel bir veritabanının kullanımını varsayar. Şu anda, kod, herhangi bir bulut sağlayıcısından gelen bir veritabanı hizmetiyle çalışmak üzere yapılandırılmış durumda, tercihen Azure.

## Nasıl Çalıştırılır

1. Bağımlılıkları yükleyin: `npm install`
2. Veritabanı bağlantısını ve çevresel değişkenleri içeren bir `.env` dosyası oluşturun.
3. Sunucuyu çalıştırın: `npm start`
4. API'ye `http://localhost:3000` adresinden erişin

## Endpointler

- **GET `/`:** API hakkında hoş geldiniz mesajı ve bilgi sağlayan kök uç nokta.

- **POST `/login`:** Kullanıcı kimliği doğrulama için uç nokta. Geçerli bir kullanıcı adı ve şifre gerektirir.

- **POST `/register`:** Kullanıcı kaydı için uç nokta. Yeni bir kullanıcı hesabı oluşturur.

- **POST `/query-ticket`:** Belirtilen kriterlere göre uygun uçuşları sorgulamak için uç nokta.

- **POST `/buy-ticket`:** Bilet satın alma için uç nokta. Kimlik doğrulama gerektirir ve başarılı işlem sonrasında kullanılabilir koltukları düşer.

## Ek Notlar

- Proje, stil için SCSS kullanarak temel bir ön uç öğesi içerir. Hoş geldiniz mesajına erişmek için kök URL'yi ziyaret edin.

- Lütfen her uç nokta hakkında detaylı bilgi için Swagger belgelerine başvurun.


## İletişim
İletişim için: atakandogan.info@gmail.com veya [LinkedIn](https://www.linkedin.com/in/atakandoan/) adresinden ulaşabilirsiniz.

Proje hakkında keşfe çıkın, katkıda bulunun ve geri bildirim sağlayın. Bu Havayolu API projesini incelediğiniz için teşekkür ederiz!

