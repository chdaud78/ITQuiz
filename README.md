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

<aside>
👻

![image.png](..%2F..%2F..%2F..%2FDownloads%2Fimage.png)

화면 구성

![image.png](..%2F..%2F..%2F..%2FDownloads%2Fimage.png)

어플리케이션 플로우

</aside>

> 기초 디자인
>

<aside>
👻
![image (1).png](..%2F..%2F..%2F..%2FDownloads%2Fimage%20%281%29.png)


레퍼런스

</aside>

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

# 디자인 시스템 with AI

```jsx
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))',
					dark: 'hsl(var(--secondary-dark))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				quiz: {
					primary: 'hsl(var(--quiz-primary))',
					'primary-foreground': 'hsl(var(--quiz-primary-foreground))',
					secondary: 'hsl(var(--quiz-secondary))',
					'secondary-foreground': 'hsl(var(--quiz-secondary-foreground))',
					correct: 'hsl(var(--quiz-correct))',
					'correct-foreground': 'hsl(var(--quiz-correct-foreground))',
					incorrect: 'hsl(var(--quiz-incorrect))',
					'incorrect-foreground': 'hsl(var(--quiz-incorrect-foreground))',
					warning: 'hsl(var(--quiz-warning))',
					'warning-foreground': 'hsl(var(--quiz-warning-foreground))'
				},
				category: {
					science: 'hsl(var(--category-science))',
					'science-light': 'hsl(var(--category-science-light))',
					history: 'hsl(var(--category-history))',
					'history-light': 'hsl(var(--category-history-light))',
					language: 'hsl(var(--category-language))',
					'language-light': 'hsl(var(--category-language-light))',
					art: 'hsl(var(--category-art))',
					'art-light': 'hsl(var(--category-art-light))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					light: 'hsl(var(--success-light))'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
					light: 'hsl(var(--error-light))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					light: 'hsl(var(--warning-light))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }]
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Cal Sans', 'Inter', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-category-science': 'var(--gradient-category-science)',
				'gradient-category-history': 'var(--gradient-category-history)',
				'gradient-category-language': 'var(--gradient-category-language)',
				'gradient-category-art': 'var(--gradient-category-art)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'elevated': 'var(--shadow-elevated)',
				'glow': 'var(--shadow-glow)',
				'category-science': 'var(--shadow-category-science)',
				'category-history': 'var(--shadow-category-history)',
				'category-language': 'var(--shadow-category-language)',
				'category-art': 'var(--shadow-category-art)'
			},
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				'md': '8px',
				'lg': '12px',
				'xl': '16px',
				'2xl': '24px',
				'3xl': '40px'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-2px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(217 91% 60% / 0.3)' },
					'50%': { boxShadow: '0 0 30px hsl(217 91% 60% / 0.5)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Definition of the design system. All colors, gradients, fonts, etc should be defined here. 
All colors MUST be HSL.
*/

@layer base {
  :root {
    /* Base Theme Colors - Modern & Clean */
    --background: 240 6% 98%;
    --foreground: 240 10% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    /* Primary Theme - Vibrant Blue */
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --primary-light: 217 91% 70%;
    --primary-dark: 217 91% 50%;

    /* Secondary Theme - Soft Purple */
    --secondary: 262 83% 58%;
    --secondary-foreground: 0 0% 100%;
    --secondary-light: 262 83% 68%;
    --secondary-dark: 262 83% 48%;

    /* Neutral Colors */
    --muted: 240 5% 96%;
    --muted-foreground: 240 4% 46%;

    --accent: 217 91% 95%;
    --accent-foreground: 217 91% 60%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 240 6% 90%;
    --input: 240 6% 90%;
    --ring: 217 91% 60%;

    /* Quiz App Semantic Colors */
    --quiz-primary: 217 91% 60%;
    --quiz-primary-foreground: 0 0% 100%;
    --quiz-secondary: 240 5% 96%;
    --quiz-secondary-foreground: 240 10% 15%;
    --quiz-correct: 142 71% 45%;
    --quiz-correct-foreground: 0 0% 100%;
    --quiz-incorrect: 0 84% 60%;
    --quiz-incorrect-foreground: 0 0% 100%;
    --quiz-warning: 38 92% 50%;
    --quiz-warning-foreground: 0 0% 100%;
    
    /* Category Colors - Vibrant & Distinctive */
    --category-science: 142 76% 50%;
    --category-science-light: 142 76% 90%;
    --category-history: 25 95% 55%;
    --category-history-light: 25 95% 90%;
    --category-language: 262 83% 58%;
    --category-language-light: 262 83% 90%;
    --category-art: 330 81% 60%;
    --category-art-light: 330 81% 90%;
    
    /* Semantic States */
    --success: 142 71% 45%;
    --success-foreground: 0 0% 100%;
    --success-light: 142 71% 90%;
    --error: 0 84% 60%;
    --error-foreground: 0 0% 100%;
    --error-light: 0 84% 90%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;
    --warning-light: 38 92% 90%;
    
    /* Beautiful Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(217 91% 60%), hsl(230 89% 70%));
    --gradient-secondary: linear-gradient(135deg, hsl(262 83% 58%), hsl(280 83% 68%));
    --gradient-success: linear-gradient(135deg, hsl(142 71% 45%), hsl(160 84% 50%));
    --gradient-card: linear-gradient(145deg, hsl(0 0% 100%), hsl(240 6% 98%));
    --gradient-hero: linear-gradient(135deg, hsl(217 91% 60%), hsl(262 83% 58%));
    --gradient-category-science: linear-gradient(135deg, hsl(142 76% 50%), hsl(160 76% 55%));
    --gradient-category-history: linear-gradient(135deg, hsl(25 95% 55%), hsl(35 95% 60%));
    --gradient-category-language: linear-gradient(135deg, hsl(262 83% 58%), hsl(280 83% 63%));
    --gradient-category-art: linear-gradient(135deg, hsl(330 81% 60%), hsl(340 81% 65%));
    
    /* Elegant Shadows & Effects */
    --shadow-card: 0 4px 12px -2px hsl(240 6% 90% / 0.15), 0 2px 6px -1px hsl(240 6% 90% / 0.1);
    --shadow-elevated: 0 10px 25px -5px hsl(240 6% 90% / 0.2), 0 4px 10px -2px hsl(240 6% 90% / 0.1);
    --shadow-glow: 0 0 30px hsl(217 91% 60% / 0.3);
    --shadow-category-science: 0 8px 20px hsl(142 76% 50% / 0.25);
    --shadow-category-history: 0 8px 20px hsl(25 95% 55% / 0.25);
    --shadow-category-language: 0 8px 20px hsl(262 83% 58% / 0.25);
    --shadow-category-art: 0 8px 20px hsl(330 81% 60% / 0.25);
    
    /* Glass Effects */
    --glass-backdrop: hsl(0 0% 100% / 0.8);
    --glass-border: hsl(240 6% 90% / 0.5);
    
    /* Interactive States */
    --hover-opacity: 0.9;
    --active-scale: 0.98;
    --focus-ring: 0 0 0 3px hsl(217 91% 60% / 0.2);

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;

    --sidebar-foreground: 240 5.3% 26.1%;

    --sidebar-primary: 240 5.9% 10%;

    --sidebar-primary-foreground: 0 0% 98%;

    --sidebar-accent: 240 4.8% 95.9%;

    --sidebar-accent-foreground: 240 5.9% 10%;

    --sidebar-border: 220 13% 91%;

    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    /* Dark Theme Base */
    --background: 240 10% 5%;
    --foreground: 240 5% 96%;

    --card: 240 10% 8%;
    --card-foreground: 240 5% 96%;

    --popover: 240 10% 8%;
    --popover-foreground: 240 5% 96%;

    /* Dark Primary Theme */
    --primary: 217 91% 65%;
    --primary-foreground: 240 10% 5%;
    --primary-light: 217 91% 75%;
    --primary-dark: 217 91% 55%;

    /* Dark Secondary */
    --secondary: 240 10% 15%;
    --secondary-foreground: 240 5% 96%;

    --muted: 240 10% 12%;
    --muted-foreground: 240 5% 65%;

    --accent: 240 10% 15%;
    --accent-foreground: 217 91% 65%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 240 5% 96%;

    --border: 240 10% 20%;
    --input: 240 10% 15%;
    --ring: 217 91% 65%;
    
    /* Dark Quiz Colors */
    --quiz-primary: 217 91% 65%;
    --quiz-primary-foreground: 240 10% 5%;
    --quiz-secondary: 240 10% 15%;
    --quiz-secondary-foreground: 240 5% 96%;
    
    /* Dark Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(217 91% 65%), hsl(230 89% 70%));
    --gradient-card: linear-gradient(145deg, hsl(240 10% 8%), hsl(240 10% 12%));
    --glass-backdrop: hsl(240 10% 8% / 0.8);
    --glass-border: hsl(240 10% 20% / 0.5);
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
  
  /* Typography Scale */
  h1 {
    @apply text-4xl font-bold tracking-tight;
  }
  
  h2 {
    @apply text-3xl font-semibold tracking-tight;
  }
  
  h3 {
    @apply text-2xl font-semibold tracking-tight;
  }
  
  h4 {
    @apply text-xl font-semibold;
  }
  
  h5 {
    @apply text-lg font-medium;
  }
  
  h6 {
    @apply text-base font-medium;
  }
}

@layer components {
  /* Glass Effect Component */
  .glass {
    background: var(--glass-backdrop);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  /* Interactive Components */
  .interactive {
    @apply transition-all duration-200 ease-out;
  }
  
  .interactive:hover {
    opacity: var(--hover-opacity);
  }
  
  .interactive:active {
    transform: scale(var(--active-scale));
  }
  
  .interactive:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  
  /* Category Components */
  .category-science {
    @apply bg-gradient-to-br from-category-science to-category-science;
    box-shadow: var(--shadow-category-science);
  }
  
  .category-history {
    @apply bg-gradient-to-br from-category-history to-category-history;
    box-shadow: var(--shadow-category-history);
  }
  
  .category-language {
    @apply bg-gradient-to-br from-category-language to-category-language;
    box-shadow: var(--shadow-category-language);
  }
  
  .category-art {
    @apply bg-gradient-to-br from-category-art to-category-art;
    box-shadow: var(--shadow-category-art);
  }
}
```

# 스프린트 계획

[React101(이민제)-스프린트계획 (1)](https://www.notion.so/255c0ff4ce3180b3b22fd4cb68a27bfa?pvs=21)