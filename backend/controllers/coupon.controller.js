import asyncHandler from "express-async-handler";
import prisma from "../utils/prisma.utils.js";

// @desc Return all coupons
// @route GET /api/coupons
// @access Private
export const index = asyncHandler(async (req, res) => {
  const coupons = await prisma.coupon.findMany({
    include: {
      invoices: true,
    },
  });

  coupons.forEach((coupon) => {
    coupon.total_discounts = coupon.invoices.reduce(
      (acc, invoice) => acc + parseInt(invoice.total),
      0
    );
  });

  res.status(200).json(coupons);
});

// @desc Create a new coupon
// @route POST /api/coupons
// @access Private
export const store = asyncHandler(async (req, res) => {
  const { name, code, description, offer, unit, expiry_date } = req.body;

  const couponExists = await prisma.coupon.findFirst({
    where: {
      OR: [{ name }, { code }],
    },
  });

  if (couponExists) {
    res.status(400);
    throw new Error("Coupon already exists");
  }

  const coupon = await prisma.coupon.create({
    data: {
      name,
      code,
      description,
      offer,
      unit,
      expiry_date: new Date(expiry_date),
    },
  });

  if (coupon) {
    res.status(201).json(coupon);
  } else {
    res.status(400);
    throw new Error("Invalid coupon data");
  }
});

// @desc Get coupon by id
// @route GET /api/coupons/:id
// @access Private
export const show = asyncHandler(async (req, res) => {
  const coupon = await prisma.coupon.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

// @desc Update an existing coupon
// @route PUT /api/coupons/:id
// @access Private
export const update = asyncHandler(async (req, res) => {
  const coupon = await prisma.coupon.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (coupon) {
    if (req.body.code) {
      const codeNotUnique = await prisma.coupon.findFirst({
        where: {
          id: {
            not: +req.params.id,
          },
          code: req.body.code,
        },
      });

      if (codeNotUnique) {
        res.status(400);
        throw new Error("Coupon already exists");
      }
    }

    coupon.code = req.body.code || coupon.code;
    coupon.description = req.body.description || coupon.description;
    coupon.offer = req.body.offer || coupon.offer;
    coupon.unit = req.body.unit || coupon.unit;
    coupon.expiry_date = req.body.expiry_date
      ? new Date(req.body.expiry_date)
      : coupon.expiry_date;

    const updatedCoupon = await prisma.coupon.update({
      where: {
        id: +req.params.id,
      },
      data: {
        code: coupon.code,
        description: coupon.description,
        offer: coupon.offer,
        unit: coupon.unit,
        expiry_date: coupon.expiry_date,
      },
    });

    res.json(updatedCoupon);
  } else {
    res.status(404);

    throw new Error("Coupon not found");
  }
});

// @desc Delete a coupon
// @route DELETE /api/coupons/:id
// @access Private
export const destroy = asyncHandler(async (req, res) => {
  try {
    await prisma.coupon.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json({
      messsage: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(404);

    throw new Error("Coupon not found");
  }
});
