import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Liam Young",
    role: "ReviewCollector / CEO",
    image: "/path/to/liam-image.jpg",
    rating: 5,
    text: "It’s the best plugin for that purpose, even better than the most popular of this kind of plugin. I will recommend strongly to try, it’s probably you will adopt it forever. One of the best plugins I ever try!"
  },
  {
    name: "Emma Jackson",
    role: "Testimonal Inc. / HR",
    image: "/path/to/emma-image.jpg",
    rating: 5,
    text: "After ages in search of a decent solution to show reviews from different sources, I found this amazing tool. The guys in Trustindex made a brilliant job developing this easy-to-use tool. I love it!"
  },
  {
    name: "Noah King",
    role: "BigThink / CEO",
    image: "/path/to/noah-image.jpg",
    rating: 5,
    text: "This plugin does the job, there are various layouts available, its easy to use, install and display reviews using shortcodes. Easy to set up, lots of options and high quality design."
  }
];

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, display: 'block', zIndex: 1 }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-6 h-6"
      >
        <path d="M15.54 18.54L8.24 12l7.3-6.54a1.5 1.5 0 1 0-2.12-2.12L4.5 12l8.92 8.66a1.5 1.5 0 1 0 2.12-2.12z"/>
      </svg>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style, display: 'block', zIndex: 1 }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-6 h-6"
      >
        <path d="M8.46 18.54L15.76 12l-7.3-6.54a1.5 1.5 0 1 1 2.12-2.12L19.5 12l-8.92 8.66a1.5 1.5 0 1 1-2.12-2.12z"/>
      </svg>
    </div>
  );
};

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="py-10 mx-auto  bg-gradient-to-r from-purple-500 to-indigo-600">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-4">
            <div className="p-6 text-center bg-white rounded-lg shadow-lg">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-24 h-24 mx-auto mb-4 rounded-full" 
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="mb-2 text-gray-500">{testimonial.role}</p>
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.124-6.545L.39 6.907l6.57-.955L10 0l3.039 5.952 6.57.955-4.856 4.638 1.125 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
