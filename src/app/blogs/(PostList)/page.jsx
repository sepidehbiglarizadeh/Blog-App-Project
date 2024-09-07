import { Suspense } from "react";
import PostList from "../_components/PostList";
import Spinner from "@/ui/Spinner";

// how to revalidate, time-base:
export const revalidate = 3600; // alan in safhe statice vali age revalidate ro sefr bezarim dynamic mishe
// after 15 => re-build =>
// 1. pass time interval +
// 2. new incoming request to rebuild this page =>
// updated data will be shown to the next user!! => ISR => incremental static re-generation

export const exprimental_ppr = true;

function BlogPage() {
  return (
    <div>
      <p className="text-secondary-500">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
        داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
        رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
        پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </p>
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
}

export default BlogPage;
