import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the URL parameters
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  
  // Generate the script content that will render the testimonials
  const scriptContent = `
    (function() {
      const containerEl = document.getElementById('testimonial-nudger-embed');
      if (!containerEl) {
        console.error('TestimonialNudger: No container element found with ID "testimonial-nudger-embed"');
        return;
      }
      
      // Set up the container
      containerEl.classList.add('tn-testimonial-embed');
      
      // Fetch testimonials from the API
      fetch('${url.origin}/api/testimonials/embed?${url.searchParams.toString()}')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch testimonials');
          }
          return response.json();
        })
        .then(data => {
          renderTestimonials(containerEl, data, ${JSON.stringify(params)});
        })
        .catch(error => {
          console.error('TestimonialNudger Error:', error);
          containerEl.innerHTML = '<div class="tn-error">Could not load testimonials</div>';
        });
      
      function renderTestimonials(container, data, settings) {
        const { testimonials, businessName } = data;
        
        if (!testimonials || testimonials.length === 0) {
          container.innerHTML = '<div class="tn-error">No testimonials found</div>';
          return;
        }
        
        // Set theme class
        const theme = settings.theme || 'light';
        container.classList.add('tn-' + theme);
        
        // Create content based on layout
        const layout = settings.layout || 'carousel';
        const showRating = settings.showRating !== 'false';
        
        if (layout === 'carousel') {
          renderCarousel(container, testimonials, showRating);
        } else if (layout === 'grid') {
          renderGrid(container, testimonials, showRating);
        } else {
          renderList(container, testimonials, showRating);
        }
        
        // Add the branding badge
        const badge = document.createElement('div');
        badge.className = 'tn-badge';
        badge.innerHTML = 'Powered by <a href="https://testimonialnudger.com" target="_blank" rel="noopener noreferrer">TestimonialNudger</a>';
        container.appendChild(badge);
      }
      
      function renderCarousel(container, testimonials, showRating) {
        const carousel = document.createElement('div');
        carousel.className = 'tn-carousel';
        
        const slides = document.createElement('div');
        slides.className = 'tn-slides';
        
        testimonials.forEach((testimonial, index) => {
          const slide = document.createElement('div');
          slide.className = 'tn-slide ' + (index === 0 ? 'tn-active' : '');
          
          const content = document.createElement('div');
          content.className = 'tn-content';
          content.textContent = '"' + testimonial.content + '"';
          
          slide.appendChild(content);
          
          if (showRating) {
            slide.appendChild(createRatingElement(testimonial.rating));
          }
          
          slide.appendChild(createAuthorElement(testimonial));
          slides.appendChild(slide);
        });
        
        carousel.appendChild(slides);
        
        // Add controls/dots
        const controls = document.createElement('div');
        controls.className = 'tn-controls';
        
        testimonials.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = 'tn-dot ' + (index === 0 ? 'tn-active' : '');
          dot.setAttribute('aria-label', 'Testimonial ' + (index + 1));
          
          dot.addEventListener('click', () => {
            // Deactivate all slides and dots
            const allSlides = slides.querySelectorAll('.tn-slide');
            const allDots = controls.querySelectorAll('.tn-dot');
            
            allSlides.forEach(el => el.classList.remove('tn-active'));
            allDots.forEach(el => el.classList.remove('tn-active'));
            
            // Activate the selected slide and dot
            allSlides[index].classList.add('tn-active');
            dot.classList.add('tn-active');
          });
          
          controls.appendChild(dot);
        });
        
        carousel.appendChild(controls);
        container.appendChild(carousel);
        
        // Set up auto-rotation
        let currentSlide = 0;
        setInterval(() => {
          const allSlides = slides.querySelectorAll('.tn-slide');
          const allDots = controls.querySelectorAll('.tn-dot');
          
          // Remove active class from current slide and dot
          allSlides[currentSlide].classList.remove('tn-active');
          allDots[currentSlide].classList.remove('tn-active');
          
          // Move to next slide
          currentSlide = (currentSlide + 1) % testimonials.length;
          
          // Add active class to new slide and dot
          allSlides[currentSlide].classList.add('tn-active');
          allDots[currentSlide].classList.add('tn-active');
        }, 5000);
      }
      
      function renderGrid(container, testimonials, showRating) {
        const grid = document.createElement('div');
        grid.className = 'tn-grid';
        
        testimonials.forEach(testimonial => {
          const item = document.createElement('div');
          item.className = 'tn-grid-item';
          
          const content = document.createElement('div');
          content.className = 'tn-content';
          content.textContent = '"' + testimonial.content + '"';
          
          item.appendChild(content);
          
          if (showRating) {
            item.appendChild(createRatingElement(testimonial.rating));
          }
          
          item.appendChild(createAuthorElement(testimonial));
          grid.appendChild(item);
        });
        
        container.appendChild(grid);
      }
      
      function renderList(container, testimonials, showRating) {
        const list = document.createElement('div');
        list.className = 'tn-list';
        
        testimonials.forEach(testimonial => {
          const item = document.createElement('div');
          item.className = 'tn-list-item';
          
          const content = document.createElement('div');
          content.className = 'tn-content';
          content.textContent = '"' + testimonial.content + '"';
          
          item.appendChild(content);
          
          if (showRating) {
            item.appendChild(createRatingElement(testimonial.rating));
          }
          
          item.appendChild(createAuthorElement(testimonial));
          list.appendChild(item);
        });
        
        container.appendChild(list);
      }
      
      function createRatingElement(rating) {
        const ratingEl = document.createElement('div');
        ratingEl.className = 'tn-rating';
        
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('span');
          star.className = 'tn-star ' + (i < rating ? 'tn-filled' : '');
          star.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
          ratingEl.appendChild(star);
        }
        
        return ratingEl;
      }
      
      function createAuthorElement(testimonial) {
        const author = document.createElement('div');
        author.className = 'tn-author';
        
        if (testimonial.authorAvatar) {
          const avatar = document.createElement('img');
          avatar.className = 'tn-avatar';
          avatar.src = testimonial.authorAvatar;
          avatar.alt = testimonial.authorName;
          author.appendChild(avatar);
        }
        
        const info = document.createElement('div');
        info.className = 'tn-author-info';
        
        const name = document.createElement('div');
        name.className = 'tn-name';
        name.textContent = testimonial.authorName;
        info.appendChild(name);
        
        if (testimonial.authorCompany) {
          const company = document.createElement('div');
          company.className = 'tn-company';
          company.textContent = testimonial.authorCompany;
          info.appendChild(company);
        }
        
        author.appendChild(info);
        return author;
      }
    })();
  `;
  
  // Return the script with JavaScript MIME type
  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600', // Cache for an hour
      'Access-Control-Allow-Origin': '*',
    },
  });
} 