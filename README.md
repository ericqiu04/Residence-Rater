
# Ontario University Residence Rater

## About The Project
Ontario Univesity Residence Rater is a web app allowing undergraduate students to provide valuable insights and ratings about their on-campus residences. The goal for this project is to foster a community-driven platform that aids future university students for a deeper understanding of their prospective living arrangements.


## Demo
#### Home Page Preview
<img src = "./rm/homescreen.jpg"/>

#### Authentication Preview
<img src = "./rm/register.gif"/>
<img src = "./rm/login.gif">

#### Pages Preview
<img src = "./rm/university and residence selection.gif">

#### Rating Preview
<img src = "./rm/residence rating.gif"/>



## Installation
Clone the project


#### Frontend
```bash
  cd project-root-directory
  cd frontend
  npm install
  npm run dev
```
#### Backend
```bash
cd project-root-directory
cd backend
pip3 install -r requirements.txt
```
Activate virtual environment
```bash
# Mac
source venv/bin/activate 
or
# Windows
venv\Scripts\activate 
```

#### Database
Create Firebase database and download a serviceAccountKey.json
<br>
Add serviceAccountKey.json into the credentials folder folder
```bash
cd project-root-directory
mkdir credentials
```
to use template for database
```bash
cd project-root-folder
cd backend
#activate virtual environment if not already
python3 load_res.py
```

#### Google Maps Api
Go into serviceAccountKey.json and add 
```bash
{
    ...
    "api_key: "Your_Api_Key"
}
```

## Tech Stack
#### Frontend
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![FramerMotion](https://img.shields.io/badge/FramerMotion-black?style=for-the-badge&logo=framer&logoColor=blue)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
#### Backend
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
#### Database
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
#### External APIs:
![Google Maps](https://img.shields.io/badge/GoogleMaps-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)


## Acknowledgements

- All university logos are from wikipedia images
- All residence images sourced from each respective universities
- Landing page image by pch.vector ->~<a href="https://www.freepik.com/free-vector/college-student-dorm-interior-young-travelers-stopping-hostel-vector-illustration-alternative-accommodation-backpackers-house-trip-concept_11671356.htm">~Freepik~</a>
- Tech Stack Banners from <a href = "https://github.com/Ileriayo/markdown-badges">Ileriayo</a>

