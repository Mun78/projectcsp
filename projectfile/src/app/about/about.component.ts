import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  image1 = '..\assets\image/cspback.jpg';
  image2 = 'https://example.com/image2.jpg';

  constructor() { }

  ngOnInit(): void {
    this.createContent();
  }

  createContent(): void {
    const contentContainer = document.querySelector('.content-container');

    if (contentContainer) {
      
    }
  }

  createSection(title: string, content: string): HTMLDivElement {
    const section = document.createElement('div');
    section.classList.add('section');

    const heading = document.createElement('h1');
    heading.textContent = title;
    section.appendChild(heading);

    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    section.appendChild(paragraph);

    return section;
  }

  createImageLink(url: string, alt: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';

    const image = document.createElement('img');
    image.src = url;
    image.alt = alt;
    image.classList.add('section-image');

    link.appendChild(image);
    return link;
  }

  createImage(url: string): HTMLImageElement {
    const image = document.createElement('img');
    image.src = url;
    image.classList.add('section-image');
    return image;
  }

  createList(items: string[]): HTMLUListElement {
    const list = document.createElement('ul');
    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    return list;
  }

}
