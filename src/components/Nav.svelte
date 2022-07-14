<script>
  import { afterUpdate, onMount } from 'svelte';
  import {
    mainAll,
    menu,
    menuSub,
    paging,
    menuSubSub,
    checkedList,
    check,
  } from '../stores';

  let listMenu = [
    {
      title: '소설관리',
      menus: [
        {
          title: '메인',
          icon: 'layer',
          src: '/novel/main/all',
          subs: [
            { title: '전체소설', src: '/novel/main/all' },
            { title: '삭제된 소설', src: '/novel/main/deleted' },
          ],
        },
        {
          title: '표지관리',
          icon: 'paint',
          src: '/novel/cover/image',
          subs: [
            { title: '이미지', src: '/novel/cover/image' },
            { title: '배경', src: '/novel/cover/background' },
          ],
        },
        {
          title: '금칙어관리',
          icon: 'filter-alt',
          src: '/novel/slangs',
          subs: [],
        },
        {
          title: '주제어관리',
          icon: 'edit-alt',
          src: '/novel/keywords',
          subs: [],
        },
        {
          title: '장르관리',
          icon: 'category',
          src: '/novel/genres',
          subs: [],
        },
      ],
    },
    {
      title: '이벤트관리',
      menus: [
        {
          title: '이벤트',
          icon: 'face',
          src: '/',
          subs: [],
        },
      ],
    },
    {
      title: 'CS관리',
      menus: [
        {
          title: '공지사항',
          icon: 'notification',
          src: '/cs/notice',
          subs: [],
        },
        {
          title: '1:1문의',
          icon: 'chat',
          src: '/cs/inquiry',
          subs: [],
        },
        {
          title: 'FAQ',
          icon: 'user',
          src: '/cs/faq',
          subs: [
            { title: 'FAQ', src: '/cs/faq' },
            { title: 'FAQ카테고리 관리', src: '/novel/genres' },
          ],
        },
      ],
    },
    {
      title: '회원관리',
      menus: [
        {
          title: '회원관리 정보',
          icon: 'user-pin',
          src: '/memberInfo/memberInformation',
          subs: [],
        },
      ],
    },
    {
      title: '통계',
      menus: [
        {
          title: '통계',
          icon: 'line-chart',
          src: '/',
          subs: [],
        },
      ],
    },
  ];
  let current = '소설관리';
  let currentSub = '메인';
  let currentSubSub = '전체소설';
  $: {
    menu.update((menu) => current);
    menuSub.update((menuSub) => currentSub);
    menuSubSub.update((menuSubSub) => currentSubSub);
  }

  // nav 이동시 모든 체크박스 풀림 , 페이지네이션 1로 초기화
  function fnPageNavSet() {
    $checkedList = [];
    $check = false;
    $paging.nowPage = 1;
  }
  afterUpdate(() => {});
</script>

<nav id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
  <div class="app-brand demo" style="padding-left: 0rem">
    <img alt="" src="/assets/img/logo.png" width="50" />
    <span class="app-brand-text demo menu-text fw-bolder ms-2">따옴 관리자</span
    >
  </div>

  <div class="menu-inner-shadow" />

  <ul class="menu-inner py-1">
    <li class="menu-item">
      <a href="index.html" class="menu-link">
        <i class="menu-icon tf-icons bx bx-home-circle" />
        <div data-i18n="Analytics">Dashboard</div>
      </a>
    </li>

    {#each listMenu as menu}
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">{menu.title}</span>
      </li>
      {#each menu.menus as item}
        <li
          class={currentSub === item.title
            ? 'menu-item active open'
            : 'menu-item'}
          on:click={() => {
            if (item.subs.length == 0) {
              current = menu.title;
              currentSub = item.title;
              currentSubSub = '';
            } else {
              current = menu.title;
              currentSub = item.title;
            }
            fnPageNavSet();
          }}
        >
          <a
            href={item.src}
            class="menu-link {item.subs.length > 0 ? 'menu-toggle' : ''}"
          >
            <i class="menu-icon tf-icons bx bx-{item.icon}" />
            <div data-i18n="Form Elements">{item.title}</div>
          </a>
          {#if item.subs.length > 0}
            <ul class="menu-sub">
              {#each item.subs as sub}
                <li
                  class={currentSubSub == sub.title
                    ? 'menu-item active'
                    : 'menu-item'}
                  on:click={() => {
                    current = menu.title;
                    currentSub = item.title;
                    currentSubSub = sub.title;
                    fnPageNavSet();
                  }}
                >
                  <a href={sub.src} class="menu-link">
                    <div data-i18n="Basic Inputs">{sub.title}</div>
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    {/each}
  </ul>
</nav>
