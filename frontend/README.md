# 아이디어 및 기획

## **💪 기획 배경**

- 개발 관련 공부를 퀴즈, 플래시카드로 만들어 재미를 주면 더 쉽게 공부할 수 있지 않을까? 라는 생각에 만들어보았습니다.

## **💪 해결 컨셉**

- 카테고리별(운영체제, react, javascript 등) 문제를 나눈다.
- 로컬스토리지에 점수를 저장하고 다시 도전하기로 복습
- 플래시카드는 앞면은 문제, 뒷면은 정답으로 되어있다.
- 맞힌 문제/ 틀린 문제 확인하는 기능을 넣어 나의 현재 지식 수준을 알 수 있게한다.
- 문제는 랜덤으로 나와야한다.

## **💪 기대 효과**

- 퀴즈를 통해 내 지식을 확인하고 공부할 수 있다.
- 재미를 통해 더 쉽게 공부를 접할 수 있다.

> 다이어 그램
>
	
<img width="1195" height="1248" alt="image (2)" src="https://github.com/user-attachments/assets/f94ab94a-b168-43c2-b5ae-cf1786a4ac2d" />


> 어플리케이션 플로우
>

<img width="1700" height="1209" alt="image" src="https://github.com/user-attachments/assets/848519b0-4b21-46b9-b97d-80689dd2f8df" />

</aside>

> 기초 디자인
>

<img width="1528" height="989" alt="image (1)" src="https://github.com/user-attachments/assets/7c890e3a-3b5c-4d54-b3d8-374b047beab9" />


# 기능 및 개발 초안

## 화면별 기능정의서

[React101(이민제)-기능정의서 (1)](https://www.notion.so/255c0ff4ce31806db916e39bdb51da5b?pvs=21)

## 기술 스택

공통

- `react`
- `router`
- `tailwindcss`

가짜 서버

- `localstorage`

# API 명세서

```jsx
quiz = [{
	id: uid,
	name: string,
	category: number,
	question : string,
	asnwer : string,
	}]
```

```jsx
user = {
	name : string,
	totalQuiz : number,
	answerQuiz: number,
	wrongQuiz : number,
	answerQuizList: [quiz.id],
	wrongQuizList : [quiz.id],
}
```

# 스프린트 계획

[React101(이민제)-스프린트계획 (1)](https://www.notion.so/255c0ff4ce3180b3b22fd4cb68a27bfa?pvs=21)
