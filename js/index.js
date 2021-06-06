(function() {
    window.Navigation = new (Navigation = function() {
        this.sections = $('main section');
        this.active = this.sections.first();
        $('a[href*="#"]').on('click', function() {
          let id, target;
          id = `#${(this.href.split('#')[1])}`;
            target = $(id);
            if (target.length > 0) {
                $('main').scrollTo(target, 400);
                return false;
            }
        });
        $('main').on('scroll', (e) => {
            let height, i, id, j, len, main, mainHeight, 
                offsetMiddleBottom, offsetMiddleTop, offsetTop, 
                ref, results, scrollTop, section;
            main = $(e.target);
            mainHeight = main.height();
            scrollTop = main.scrollTop();
            offsetTop = 0;
            ref = this.sections;
            results = [];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                section = ref[i];
                section = $(section);
                height = section.outerHeight();
                if (i > 0) {
                    offsetTop += height;
                }
                offsetMiddleTop = offsetTop + (mainHeight / 2);
                offsetMiddleBottom = offsetTop + (height - (mainHeight / 2));
                if (offsetMiddleTop > scrollTop && scrollTop < offsetMiddleBottom) {
                    if (!this.active.is(section)) {
                        this.active = section;
                        id = this.active.attr('id');
                        $(`nav .menu a[href*="#${id}"]`)
                            .closest('li')
                            .addClass('active')
                            .siblings('.active')
                            .removeClass('active');
                    }
                    break;
                } else {
                    results.push(void 0);
                }
            }
            return results;
        });
        return this;
    })();
    window.Skills = new (Skills = function() {
        let deleteSpeed, humanDelay, typeSpeed;
        humanDelay = function (init) {
            return (init || 150) + ((Math.random() * 100) - 50);
        };
        typeSpeed = 100;
        deleteSpeed = 150;
        this.list = $('.skills');
        this.skills = this.list.find('.skill');
        this.active = this.skills.filter('.active');
        this.skills.each(function() {
            let letters, skill;
            skill = $(this);
            letters = skill.text().trim().split('');
            skill.html(`<font>${letters.join('</font><font>')}</font>`);
            if (!skill.hasClass('active')) {
                return skill.find('font').addClass('deleted');
            }
        });
        this.animate = (type) => {
            let current, input, length, letters, reduce;
            type = type || 'in';
            letters = this.active.find('font');
            length = letters.length;
            current = type === 'in' ? 0 : length - 1;
            input = () => {
                if (current >= length) {
                    this.list.removeClass('typing');
                    return setTimeout(() => {
                        return this.animate('out');
                    }, humanDelay(3000));
                } else if (current < length) {
                    $(letters[current]).removeClass('deleted');
                    this.list.addClass('typing');
                    current++;
                    return setTimeout(input, humanDelay(typeSpeed));
                }
            };
            reduce = () => {
                let next;
                if (current >= 0) {
                    $(letters[current]).addClass('deleted');
                    this.list.addClass('typing');
                    current--;
                    return setTimeout(reduce, humanDelay(deleteSpeed));
                } else {
                    next = this.active.removeClass('active').next('.skill');
                    if (next.length > 0) {
                        this.active = next.addClass('active');
                    } else {
                        this.active = this.list.find('.skill:first-child').addClass('active');
                    }
                    letters = this.active.find('font');
                    length = letters.length;
                    current = 0;
                    this.list.removeClass('typing');
                    return setTimeout(input, humanDelay(250));
                }
            };
            if (type === 'out') {
                return setTimeout(reduce, humanDelay(deleteSpeed));
            } else {
                return setTimeout(input, humanDelay(typeSpeed));
            }
        };
        setTimeout(() => {
            return this.animate('out');
        }, humanDelay(3000));
        return this;
    })();
}).call(this);
