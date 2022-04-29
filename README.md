# ShootHere

공영, 개인 관련 없이 `주변 풋살장 정보`를 한번에 모아 볼 수 있는 페이지

## Why?
직접 풋살 그룹에 소속되어 활동을 하다보니
- 풋살장 대관 예약이 선착순으로 진행되고
- 공영 풋살장은 공영대로 각 구마다 다른 방법을 통해 예약할 수 있었고
- 한 장소에 대해서도 여러 페이지를 통해 예약이 가능하여 혼란스러움을 느꼈다
- 개인소유 풋살장은 예약 페이지가 있는 곳도 있고, 전화로 가능한 곳도 있었다
- 예약 전쟁이 일어날때마다 모든 페이지를 돌아가며 하기엔 매우 번거롭기 때문에
- 이런 문제를 간단하게나마 해결해보고 싶었다

![image](https://user-images.githubusercontent.com/32658347/165424902-760035ca-ca5b-47c9-a09a-44108026eeb6.png)

## Features

|GPS를 기반으로 현재 도시 주변의 풋살장 데이터를 제공|
|------|
|<img src="https://user-images.githubusercontent.com/32658347/165425374-e4d8c634-752a-43cb-9167-2e9bc34ac4c9.png" width="80%" height="80%" />|

<br />

|네이버 지도 API를 이용한 풋살장 위치 표시 및 길찾기 기능 구현. (데스크톱의 경우 경로를 지도에 표시, 모바일에선 네이버 지도앱 네비게이션 기능으로 연결)|
|------|
|![image](https://user-images.githubusercontent.com/32658347/165425553-a9436977-5a64-436c-977c-cf90dd6d5266.png)|

<br />

|네이버 지도 API는 API KEY 등의 노출을 피하기 위해 NestJS 서버를 통해 지도 관련 요청 처리|
|------|
|![image](https://user-images.githubusercontent.com/32658347/165425698-14a76b86-6455-41f1-b68c-c3d63c1343e2.png)|

<br />

|구글 로그인한 유저의 경우 자주 이용하는 풋살장 즐겨찾기 기능을 제공|
|------|
|<img src="https://user-images.githubusercontent.com/32658347/165425374-e4d8c634-752a-43cb-9167-2e9bc34ac4c9.png" width="80%" height="80%" />|

<br />

|풋살장 현장 이미지 열람이 가능하도록 Carousel 구현|
|------|
|![image](https://user-images.githubusercontent.com/32658347/165426595-77a1226c-e83f-4656-b87d-495a5b038778.png)|

<br />

|Debounce 기법을 적용한 풋살장 검색 기능 구현|
|------|
|![debounce_search](https://user-images.githubusercontent.com/32658347/165428038-6287ce99-3082-430b-b4f6-76c516ac9eb9.gif)|

<br />

|유저가 추가적으로 직접 풋살장 정보를 등록할 수 있도록 기능 구현|
|------|
|![image](https://user-images.githubusercontent.com/32658347/165426811-904d134d-da00-4a7a-96ff-32b69208b945.png) |

|풋살장 데이터 조회 및 등록은 [Sanity](https://www.sanity.io/) 를 이용해서 구현|
|------|
 
 
## Table structure

![image](https://user-images.githubusercontent.com/32658347/165876195-09d497eb-517d-45ca-85c5-39d0624e17e7.png)

<br />

## Folder structure 

![스크린샷 2022-04-27 오후 5 07 19](https://user-images.githubusercontent.com/32658347/165876273-c7c3027a-f12e-4e48-bb4b-726c48f6c604.png)

<br />
