import MentorItem from '@/components/common/MentorItem';
import Slider from '@/components/main/Slider';

export default function Home() {
  return (
    <section>
      <Slider />
      <article className="mx-auto md:w-[768px] lg:w-[1200px]">
        <MentorItem />
      </article>
    </section>
  );
}
