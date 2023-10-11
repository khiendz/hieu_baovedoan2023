import React from "react";
import { Card } from "antd";
import LayoutDefault from "components/layouts/LayoutDefault";

const { Meta } = Card;

const Product: React.FC = () => (
  <LayoutDefault>
    <div className="introduce content-container content-miss dk-flex dk-flex-row dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7 dk-flex-wrap dk-justify-center">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_223238.jpg"
          />
        }
      >
        <Meta title="100 bài văn hay" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://cdn0.fahasa.com/media/catalog/product/l/o/loi_giai_cac_bai_toan_hay_kho_5_1_2018_08_30_16_41_35.JPG"
          />
        }
      >
        <Meta title="Lời giải các bài toán" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_1876.jpg"
          />
        }
      >
        <Meta title="Các bài toán đố" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://cdn0.fahasa.com/media/catalog/product/8/9/8936083209165_1_1.jpg"
          />
        }
      >
        <Meta title="Tiếng việt lớp 5" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://cdn0.fahasa.com/media/catalog/product/8/9/8936083207888.jpg"
          />
        }
      >
        <Meta title="Những bài văn hay 9" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://cdn0.fahasa.com/media/catalog/product/m/u/mua-he-khong-ten---bia-mem---qua-tang-kem-1.jpg"
          />
        }
      >
        <Meta title="Mùa hè không tên" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.hielibrary.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img className="dk-w-[240px] dk-h-[300px]"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.hielibrary.com" />
      </Card>
    </div>
  </LayoutDefault>
);

export default Product;
